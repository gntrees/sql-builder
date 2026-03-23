export interface GenerateOptions {
    url: string;
    output?: string;
}
export declare function generate(options: GenerateOptions): Promise<{
    outputPath: string;
}>;
