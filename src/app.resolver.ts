import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import * as Upload from "graphql-upload/Upload.js";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import path, { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";



@Resolver()
export class AppResolver {
    @Query(() => String)
    helloWorld() {
        return "Hello World!";
    }


    @Mutation(() => Boolean, { name: 'uploadImage' })
    async uploadImage(
        @Args({ name: 'image', type: () => GraphQLUpload })
        image: Upload,
        @Args({ name: 'createFileInDirectory', type: () => Boolean })
        createfileInDirectory: boolean
    ) {
        const file = await image;
        console.log("Image uploaded called", {
            file,
            createfileInDirectory
        });

        return new Promise((resolve, reject) => {
            if (createfileInDirectory) {
                const dirPath = join(__dirname, '../uploads');

                if (!existsSync(dirPath)) {
                    mkdirSync(dirPath, { recursive: true });
                }

                file.createReadStream().pipe(createWriteStream(`${dirPath}/${file.filename}`)).on('finish', () => {
                    console.log('IMAGE_CREATED_IN_DIRECTORY');
                    resolve(true);
                }).on('error', error => {
                    console.log('IMAGE_UPLOAD_ERROR', error);
                    reject(false);
                });
            } else {
                file.createReadStream().on('data', data => {
                    console.log('DATE_FROM_STREAM', data);
                }).on('end', () => {
                    console.log('END_OF_STREAM');
                    resolve(true);
                }).on('error', error => {
                    console.log('IMAGE_UPLOAD_ERROR', error);
                    reject(false);
                });
            }
        });
    }
}