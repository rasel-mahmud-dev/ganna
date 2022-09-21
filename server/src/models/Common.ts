import connectDatabase from "../services/mysql";


class Common{
    
    // it overrides with extended class Model
    static tableName = ""
    
    constructor() {
    
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
}

export default Common