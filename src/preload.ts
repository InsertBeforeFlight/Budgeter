import { contextBridge } from "electron";
import RendererIpcFileModule from "./modules/RendererIpcFileModule";
import RendererIpcDirectoryModule from "./modules/RendererIpcDirectoryModule";
import RendererIpcParsingModule from "./modules/RendererIpcParsingModule";

const askToPromptForFilePath = RendererIpcFileModule.askToPromptForFilePath.bind(RendererIpcFileModule);
const resolvePromptedForFilePath = RendererIpcFileModule.resolvePromptedForFilePath.bind(RendererIpcFileModule);
const askForFileContent = RendererIpcFileModule.askForFileContent.bind(RendererIpcFileModule);
const resolveFileContent = RendererIpcFileModule.resolveFileContent.bind(RendererIpcFileModule);
const askForFileCreation = RendererIpcFileModule.askForFileCreation.bind(RendererIpcFileModule);
const waitForFileCreation = RendererIpcFileModule.waitForFileCreation.bind(RendererIpcFileModule);
const askForFileDeletion = RendererIpcFileModule.askForFileDeletion.bind(RendererIpcFileModule);
const waitForFileDeletion = RendererIpcFileModule.waitForFileDeletion.bind(RendererIpcFileModule);

const askForHomeDirectoryPath = RendererIpcDirectoryModule.askForHomeDirectoryPath.bind(RendererIpcDirectoryModule);
const resolveHomeDirectoryPath = RendererIpcDirectoryModule.resolveHomeDirectoryPath.bind(RendererIpcDirectoryModule);
const askForDirectoryContent = RendererIpcDirectoryModule.askForDirectoryContent.bind(RendererIpcDirectoryModule);
const resolveDirectoryContent = RendererIpcDirectoryModule.resolveDirectoryContent.bind(RendererIpcDirectoryModule);

const askForSpendeeExportParsing = RendererIpcParsingModule.askForSpendeeExportParsing.bind(RendererIpcParsingModule);
const resolveSpendeeExportParsing = RendererIpcParsingModule.resolveSpendeeExportParsing.bind(RendererIpcParsingModule);

contextBridge.exposeInMainWorld("modules", {
    file: {
        // PROMPT_FILE_PATH
        askToPromptForFilePath,
        resolvePromptedForFilePath,

        // FILE_PATH
        askForFileContent,
        resolveFileContent,

        // FILE_CREATION
        askForFileCreation,
        waitForFileCreation,

        // FILE_DELETION
        askForFileDeletion,
        waitForFileDeletion
    },
    directory: {
        // HOME_DIRECTORY_PATH
        askForHomeDirectoryPath,
        resolveHomeDirectoryPath,

        // DIRECTORT_CONTENT
        askForDirectoryContent,
        resolveDirectoryContent
    },
    parsing: {
        // SPENDEE_EXPORT_PARSING
        askForSpendeeExportParsing,
        resolveSpendeeExportParsing
    }
});