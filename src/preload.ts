// See the Electron documentation for details on how to use preload scripts:
import { ipcRenderer, contextBridge } from "electron";
import * as constants from "./constants";
import IpcRendererEvent = Electron.IpcRendererEvent;
import IFilePathPromptRequest from "./models/IFilePathPromptRequest";
import IFilePathPromptResponse from "./models/IFilePathPromptResponse";
import IHomeDirectoryPathResponse from "./models/IHomeDirectoryPathResponse";
import IFileContentRequest from "./models/IFIleContentRequest";
import IFileContentResponse from "./models/IFileContentResponse";
import IFileCreationRequest from "./models/IFileCreationRequest";
import IFileCreationResponse from "./models/IFileCreationResponse";

function promptForFilePath(reasonForFile: string): void {
    const request: IFilePathPromptRequest = { reasonForFile };
    ipcRenderer.send(constants.IPC_PROMPT_FILE_PATH_REQUEST, request);
}

async function waitForPromptedForFilePath(): Promise<string> {
    const message = await addIpcListener<IFilePathPromptResponse>(constants.IPC_PROMPT_FILE_PATH_SUCCESS_RESPONSE);
    return message.filePath;
}

function askForHomeDirectoryPath(): void {
    ipcRenderer.send(constants.IPC_HOME_DIRECTORY_PATH_REQUEST);
}

async function waitForHomeDirectoryPath(): Promise<string> {
    const message = await addIpcListener<IHomeDirectoryPathResponse>(constants.IPC_HOME_DIRECTORY_PATH_SUCCESS_RESPONSE);
    return message.homeDirectoryPath;
}

function askForFileContent(filePath: string): void {
    const request: IFileContentRequest = { filePath };
    ipcRenderer.send(constants.IPC_FILE_CONTENT_REQUEST, request);
}

async function waitForFileContent(): Promise<string> {
    const message = await addIpcListener<IFileContentResponse>(constants.IPC_FILE_CONTENT_SUCCESS_RESPONSE)
    return message.fileContent;
}

function askForFileCreation(filePath: string, fileContent: string): void {
    const request: IFileCreationRequest = { filePath, fileContent };
    ipcRenderer.send(constants.IPC_FILE_CREATION_REQUEST, request);
}

async function waitForFileCreation(): Promise<void> {
   await addIpcListener<IFileCreationResponse>(constants.IPC_FILE_CREATION_SUCCESS_RESPONSE)
}

async function addIpcListener<TMessage>(channel: string): Promise<TMessage> {
    return new Promise((resolve, reject) => {
        ipcRenderer.on(channel, (event: IpcRendererEvent, message: TMessage) => {
            if (!message) {
                reject();
            }

            resolve(message);
        });
    })
}

contextBridge.exposeInMainWorld("controllers", {
    storage: {
        promptForFilePath,
        waitForPromptedForFilePath,
        askForHomeDirectoryPath,
        waitForHomeDirectoryPath,
        askForFileContent,
        waitForFileContent,
        askForFileCreation,
        waitForFileCreation
    }
});