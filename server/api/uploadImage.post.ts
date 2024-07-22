import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    try {
        const files = await readMultipartFormData(event);
        const file = files?.[0];

        if(!file) {
            return createError({statusCode: 400, statusMessage: 'File is Invalid'})
        }
    
        const filePath = path.join(process.cwd(), 'public', file?.filename as string)
        fs.writeFileSync(filePath, file?.data || "")
    
        return file?.filename;
    } catch (error) {
        return createError({statusCode: 500, statusMessage: 'Something went wrong. Please, try again.'})
    }
});