import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { IntegerType } from "mongodb";
import { join } from "path";

@Injectable()
export class FileService{
    async updload(file: Express.Multer.File, id:number){
        return await writeFile(join(__dirname,'..','..','storage','photos', `photo-${id}.png`),file.buffer)
    }
}