import connectDatabase from "../services/mysql";


class Common{
    
    // it overrides with extended class Model [for static method]
    static tableName = ""
    
    // for instance method
    tableName: string;
    
    constructor(tableName: string) {
        this.tableName = tableName
    }
    
    // find all by any field
    static find<T>(valuesObj?: {} | any, selectFields?: string)  {
        return new Promise<T | null>(async (resolve, reject) => {
            let connection
            try{
                connection = await connectDatabase()
                let tableName = this.tableName
                
                let fieldName = ""
                let value = ""
                for(let key in valuesObj){
                    fieldName = key
                    value = valuesObj[key]
                }
                
                let sql  = `SELECT ${selectFields ? selectFields : '*' } from ${tableName}`
                if(fieldName !== "" && value !== ""){
                    sql += ` where ${fieldName} = "${value}"`
                }
                console.log(sql)
                let [result]: any = await connection.query(sql)
                
                if(result.length > 0){
                    resolve(result)
                } else {
                    resolve(null)
                }
            } catch (ex){
                reject(ex)
                
            } finally {
                connection?.end()
            }
        })
    }
    
    // find one by any field
    static findOne<T>(valuesObj: {} | any, selectFields?: string)  {
        return new Promise<T | null>(async (resolve, reject) => {
            let connection
            try{
                connection = await connectDatabase()
                let tableName = this.tableName
                
                let fieldName = ""
                let value = ""
                for(let key in valuesObj){
                    fieldName = key
                    value = valuesObj[key]
                }
                
                let sql  = `SELECT ${selectFields ? selectFields : '*' } from ${tableName} where ${fieldName} = "${value}"  `
                let [r, _]: any = await connection.query(sql)
                
                if(r.length > 0){
                    resolve(r[0])
                } else {
                    resolve(null)
                }
            } catch (ex){
                reject(ex)
                
            } finally {
                connection?.end()
            }
        })
    }
    
    // delete one by any field
    static deleteOne<T>(filter: {[key: string]: any})  {
        return new Promise<T | null>(async (resolve, reject) => {
            let connection
            try{
                connection = await connectDatabase()
                let tableName = this.tableName
                
                let fieldName = ""
                let value = ""
                for(let key in filter){
                    fieldName = key
                    value = filter[key]
                }
                
                let sql  = `DELETE FROM ${tableName} WHERE ${fieldName} = ${value}`
                let [r]: any = await connection.query(sql)
                if(r.affectedRows){
                    resolve(r.affectedRows)
                } else {
                    resolve(null)
                }
            } catch (ex){
                reject(ex)
                
            } finally {
                connection?.end()
            }
        })
    }
    
    
    
    async save(){
        
        let fieldName = ""
        let values = ""
        
        const data = {...this}
        for (const dataKey in data) {
            // ignore tableName field
            if(dataKey !== "tableName") {
                if (!data[dataKey]) {
                    delete data[dataKey]
                } else {
                    fieldName = fieldName + ", " + dataKey
                    values = values + `, "${data[dataKey]}"`
                }
            }
        }
        
        try{
    
            let tableName = this.tableName
            
            let sql = `insert into ${tableName}( ${fieldName.slice(2)} ) Values(${values.slice(2)})`
            
            const connection = await connectDatabase()
            let [result] = await connection.execute<any>(sql)
            if(result["affectedRows"]){
                return result["insertId"]
            } else {
                return null
            }
        } catch (ex){
            throw ex
        }
        
    }
    
}

export default Common