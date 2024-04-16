import { BaseEntities } from "./BaseEntites";
class SessionLogin {
    private userId: string;
    private email: string;
    private name: string;
    private username: string;
    private jwttoken: string;
    private refreshToken: string;
    private expireRefreshToken: string;
    private expireDate: Date;
    private deviceId: string;
    private ipAddress: string;
    private dbName: string;


    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getJwttoken(): string {
        return this.jwttoken;
    }

    public setJwttoken(jwttoken: string): void {
        this.jwttoken = jwttoken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    public getExpireRefreshToken(): string {
        return this.expireRefreshToken;
    }

    public setExpireRefreshToken(expireRefreshToken: string): void {
        this.expireRefreshToken = expireRefreshToken;
    }

    public getExpireDate(): Date {
        return this.expireDate;
    }

    public setExpireDate(expireDate: Date): void {
        this.expireDate = expireDate;
    }

    public getDeviceId(): string {
        return this.deviceId;
    }

    public setDeviceId(deviceId: string): void {
        this.deviceId = deviceId;
    }

    public getIpAddress(): string {
        return this.ipAddress;
    }

    public setIpAddress(ipAddress: string): void {
        this.ipAddress = ipAddress;
    }

    public getDbName(): string {
        return this.dbName;
    }

    public setDbName(dbName: string): void {
        this.dbName = dbName;
    }

    constructor(
        userId: string,
        email: string,
        name: string,
        username: string,
        jwttoken: string,
        refreshToken: string,
        expireRefreshToken: string,
        expireDate: Date,
        deviceId: string,
        ipAddress: string,
        dbName: string
    ) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.username = username;
        this.jwttoken = jwttoken;
        this.refreshToken = refreshToken;
        this.expireRefreshToken = expireRefreshToken;
        this.expireDate = expireDate;
        this.deviceId = deviceId;
        this.ipAddress = ipAddress;
        this.dbName = dbName;
    }
}

class SessionWithBase extends BaseEntities {
    private session: SessionLogin;
    constructor(session: SessionLogin) {
        super();
        Object.assign(this, session);
    }
    public getUserId(): string {
        return this.session.getUserId();
    }

    public setUserId(userId: string): void {
        this.session.setUserId(userId);
    }

    public getEmail(): string {
        return this.session.getEmail();
    }

    public setEmail(email: string): void {
        this.session.setEmail(email);
    }

    public getName(): string {
        return this.session.getName();
    }

    public setName(name: string): void {
        this.session.setName(name);
    }

    public getUsername(): string {
        return this.session.getUsername();
    }

    public setUsername(username: string): void {
        this.session.setUsername(username);
    }

    public getJwttoken(): string {
        return this.session.getJwttoken();
    }

    public setJwttoken(jwttoken: string): void {
        this.session.setJwttoken(jwttoken);
    }

    public getRefreshToken(): string {
        return this.session.getRefreshToken();
    }

    public setRefreshToken(refreshToken: string): void {
        this.session.setRefreshToken(refreshToken);
    }

    public getExpireRefreshToken(): string {
        return this.session.getExpireRefreshToken();
    }

    public setExpireRefreshToken(expireRefreshToken: string): void {
        this.session.setExpireRefreshToken(expireRefreshToken);
    }

    public getExpireDate(): Date {
        return this.session.getExpireDate();
    }

    public setExpireDate(expireDate: Date): void {
        this.session.setExpireDate(expireDate);
    }

    public getDeviceId(): string {
        return this.session.getDeviceId();
    }

    public setDeviceId(deviceId: string): void {
        this.session.setDeviceId(deviceId);
    }

    public getIpAddress(): string {
        return this.session.getIpAddress();
    }

    public setIpAddress(ipAddress: string): void {
        this.session.setIpAddress(ipAddress);
    }

    public getDbName(): string {
        return this.session.getDbName();
    }

    public setDbName(dbName: string): void {
        this.session.setDbName(dbName);
    }
}

export { SessionLogin, SessionWithBase };
