import {IVersionSource} from "./IVersionSource";

export class VersionHandler {

  private readonly config: IConfig;
  private readonly versionSource: IVersionSource;

  constructor(config: IConfig, versionSource: IVersionSource) {
    this.config = config;
    this.versionSource = versionSource;
  }

  public async run() {
    for (const mod of this.config.mods) {
      for (const group in mod.versions) {
        const minecraftVersion = mod.versions[group];
        const versionData = await this.versionSource.getLatestVersion(mod.curseforgeId, minecraftVersion);
        console.log(versionData); // TODO
      }
    }
  }

}

export interface IConfig {
  mods: IMod[];
}

export interface IMod {
  curseforgeId: string;
  versions: {[group: string]: string};
}
