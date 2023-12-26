import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (req, { params }) => {
    try {
        // Path to the file you want to send
        const filePath = path.join(process.cwd(), `public/assets/benchmarks/${params['file-name']}`);
        // Read the file content
        const fileContent = fs.readFileSync(filePath);
        return new Response(fileContent, { status: 200 });
    } catch (error) {
        return new Response("Failed to send over file", { status: 500 });
    }
};
