#!/usr/bin/env node
"use strict";

import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';

interface OptimagerConfig {
    inputFolders: string[];
    outputFolders: string[];
    cleanInput?: boolean;
    cleanOutput?: boolean;
}

function cleanFolders(Folders: string[]): void {
    
    Folders.forEach((folder) => {
        console.log("Cleaning folder: " + folder )
        if (fs.existsSync(folder)) {
            fs.readdirSync(folder).forEach((file) => {
                fs.unlinkSync(`${folder}/${file}`);
            });
        }
    });
}

function runProcess(config: OptimagerConfig): void {
    const { inputFolders, outputFolders, cleanInput, cleanOutput } = config;

    switch (cleanInput){
        case true:
            cleanFolders(inputFolders)
            break
        case false:
            break
        default:
            break
    }

    switch (cleanOutput){
        case true:
            cleanFolders(outputFolders)
            break
        case false:
            break
        default:
            cleanFolders(outputFolders)
    }

    convertImagesToWebp(inputFolders, outputFolders)

}

function convertImagesToWebp(inputFolders: string[], outputFolders: string[]): void {

    inputFolders.forEach((inputFolder, index) => {
        if (!fs.existsSync(outputFolders[index])) {
            fs.mkdirSync(outputFolders[index], { recursive: true });
        }

        fs.readdirSync(inputFolder).forEach((filename) => {
            if (filename.toLowerCase().endsWith(".png") || filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".jpeg")) {
                sharp(`${inputFolder}/${filename}`)
                    .toFile(`${outputFolders[index]}/${filename.replace(/\..+$/, '')}.webp`, (err) => {
                        if (err) throw err;
                    });
            }
        });

        console.log(`Conversion for ${inputFolder} -> ${outputFolders[index]}`);
    });

    console.log("Images converted to webp");
}

function loadConfig(): OptimagerConfig {
    const configPath = path.resolve(process.cwd(), 'optimager.config.json');
    if (!fs.existsSync(configPath)) {
        throw new Error('Configuration file optimager.config.json not found');
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function run(): void {
    try {
        const config = loadConfig();
        runProcess(config);
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
    process.exit(0);
}

// Execute the script if run directly from the command line
if (require.main === module) {
    run();
}

// export { convertImagesToWebp, runProcess, loadConfig, run };
export { run };