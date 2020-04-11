import Component from "../core/Component";
import DrawManager from "../managers/DrawManager";
import Two from 'two.js';
export default class SpriteRenderer extends Component {
    constructor(parent, name, image, stretchMode) {
        super(parent, name);
        this._name = "SpriteRenderer";
        this.image = image;
        this.scale = 1;
        this.stretchMode = stretchMode;
    }
    Init() {
        this.texture = new Two.Texture(this.image);
        this.shape = this.parent.engine.GetManager(DrawManager).GetContext().makeRectangle(this.parent.transform.position.x, this.parent.transform.position.y, this.parent.transform.scale.x, this.parent.transform.scale.y);
        this.shape.noStroke();
        this.shape.fill = this.texture;
    }
    Update() {
        this.shape.width = this.parent.transform.scale.x;
        this.shape.height = this.parent.transform.scale.y;
        switch (this.stretchMode) {
            case 0: {
                let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
                if (imgRatio < 1) {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.height / this.texture.image.naturalHeight), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                }
                else {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.width / this.texture.image.naturalWidth));
                }
                break;
            }
            case 1: {
                let imgRatio = this.texture.image.naturalWidth / this.texture.image.naturalHeight;
                if (imgRatio < 1) {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.width / this.texture.image.naturalWidth));
                }
                else {
                    this.texture.scale = new Two.Vector(this.scale * (this.shape.height / this.texture.image.naturalHeight), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                }
                break;
            }
            case 2: {
                this.texture.scale = new Two.Vector(this.scale * (this.shape.width / this.texture.image.naturalWidth), this.scale * (this.shape.height / this.texture.image.naturalHeight));
                break;
            }
        }
        this.shape.translation.set(this.parent.transform.position.x, this.parent.transform.position.y);
    }
    Unload() {
        this.shape.remove();
    }
}
export var SpriteMode;
(function (SpriteMode) {
    SpriteMode[SpriteMode["BestFit"] = 0] = "BestFit";
    SpriteMode[SpriteMode["Cover"] = 1] = "Cover";
    SpriteMode[SpriteMode["Stretch"] = 2] = "Stretch";
    SpriteMode[SpriteMode["Unscaled"] = 3] = "Unscaled";
})(SpriteMode || (SpriteMode = {}));
