/**
 * Interface for different ways of fetching version data.
 */
export interface IVersionSource {

  getLatestVersion(mod: string, minecraftVersion: string): Promise<IVersionData>;

}

export interface IVersionData {
  downloadUrl: string;
  version: string;
}
