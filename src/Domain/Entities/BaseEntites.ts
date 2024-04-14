class BaseEntities{
  private _isDelete: boolean;
  private _createTime: Date;
  private _updateTime: Date;
  private _isActive: boolean;

  public get isDelete(): boolean {
    return this._isDelete;
  }

  public set isDelete(isDelete: boolean) {
    this._isDelete = isDelete;
  }

  public get createTime(): Date {
    return this._createTime;
  }

  public set createTime(createTime: Date) {
    this._createTime = createTime;
  }

  public get updateTime(): Date {
    return this._updateTime;
  }

  public set updateTime(updateTime: Date) {
    this._updateTime = updateTime;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  constructor() {
    this._isDelete = false;
    this._createTime = new Date();
    this._updateTime = new Date();
    this._isActive = true;
  }
}

export { BaseEntities };
