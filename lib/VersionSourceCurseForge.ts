import "isomorphic-fetch";
import {IVersionData, IVersionSource} from "./IVersionSource";

/**
 * Fetch version data from CurseForge.
 */
export class VersionSourceCurseForge implements IVersionSource {

  public async getLatestVersion(mod: string, minecraftVersion: string): Promise<IVersionData> {
    // Fetch JSON
    const url = `https://api.cfwidget.com/minecraft/mc-mods/${mod}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url} (${response.status}: ${response.statusText})`);
    }
    const data = await response.json();

    // Determine latest version
    const versions = data.versions[minecraftVersion];
    if (!versions) {
      throw new Error(`Could not find releases for ${mod} on minecraft version ${minecraftVersion}.
Found: ${JSON.stringify(Object.keys(data.versions))}`);
    }
    const latestVersion = versions[0];
    const downloadUrl = latestVersion.url;
    const version = latestVersion.name.match(/-(\d+\.\d+\.\d+)\.jar/i)[1];
    return { downloadUrl, version };
  }

}
