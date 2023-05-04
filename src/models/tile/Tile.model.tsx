import ContainerConnectorModel from "../CDP/ContainerConnector.model";
import ContainerTileModel from "../CDP/ContainerTile.model";
import MemberTileModel from "./MemberTile.model";
import TilePreviewEnum from "./TilePreview.enum";

export default class TileModel{
    
    tileTitle: string; 
    tileCode: string;
    tileVersion: string;    
    tileIcon: string;
    tileDescription: string;
    connectorName: string;    
    connectorVersion: string;
    hasTileSummaryMethod: boolean

    // from member/cu config
    memberSelectedPreviewTemplate: TilePreviewEnum;
    
    removed: boolean;
    sortOrder: number;

    // cu set
    canRemove: boolean;
    canReorder: boolean;
    canResize: boolean;
    overrideTileCss: boolean;
    tileColorCss: string;

    // updated after the tile preview is created
    // needed by the edit page
    availablePreviews: TilePreviewEnum[];

    disableVisible: boolean;


    constructor(memberTile: MemberTileModel, containerTile: ContainerTileModel){
        this.tileTitle = containerTile.Title;
        this.tileCode = containerTile.TileCode;
        this.tileVersion = containerTile.TileVersion;
        this.tileIcon = containerTile.Icon;
        this.tileDescription = containerTile.TileDescription;      
        this.memberSelectedPreviewTemplate = memberTile.previewID;
        this.removed = memberTile.removed;
        this.sortOrder = memberTile.sortOrder;    
        this.canRemove = memberTile.canRemove;
        this.canReorder = memberTile.canRemove;
        this.canResize = memberTile.canResize;
        this.overrideTileCss = memberTile.overrideTileCss;
        this.tileColorCss = memberTile.tileColorCss;

        this.disableVisible = !this.canRemove;

        this.hasTileSummaryMethod = false;

        // this comes from a successful tile summary call, updated after the fact
        this.availablePreviews = [];
        
        // everyone gets the icon preview
        this.availablePreviews.push(TilePreviewEnum.Template1)


        // TODO: this is the code for when the platform is fixed for TileSummary/tileSummary
        if (containerTile.Connectors.length > 0){
            console.log("TS", memberTile);
            const findConnector = containerTile.Connectors.find((c: ContainerConnectorModel)=> c.ConnectorName.toLowerCase() === memberTile.connectorName.toLowerCase() && c.ConnectorVersion === memberTile.connectorVersion);
            
            if (findConnector){
                console.log("HAS TS")
                this.connectorName = findConnector.ConnectorName;
                this.connectorVersion = findConnector.ConnectorVersion;
                this.hasTileSummaryMethod = true;
            }
        }

       

        // TODO: remove after the platform release 2023.1.1
        // if (memberTile.connectorName !== "" && memberTile.connectorVersion !== ""){
        //     this.connectorName = memberTile.connectorName
        //          this.connectorVersion = memberTile.connectorVersion;
        //          this.hasTileSummaryMethod = true;
        // }
    }
}