import express from 'express';

export abstract class V1RoutesConfig {
    app: express.Application;
    name: string;
    version: string = "v1";

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    abstract configureRoutes(): express.Application;
}