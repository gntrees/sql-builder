import { generateProject } from "@gntrees/method-chain";
import { sqlBuilderConfig, sqlBuilderProject } from "./sql-builder.project";

await generateProject(sqlBuilderProject, sqlBuilderConfig);
