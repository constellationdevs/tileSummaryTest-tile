export default class MemberTileModel {
    canRemove: boolean;
    canReorder: boolean;
    canResize: boolean;
    connectorMethod: string;
    connectorName: string;
    connectorVersion: string;
    isAuthenticated: boolean;
    overrideTileCss: boolean;
    previewID: number; // TODO: need a connector update to pull cu selection if canResize is false
    removed: boolean;
    sortOrder: number;
    tileCode: string;
    tileVersion:string;
    tileColorCss: string;
}