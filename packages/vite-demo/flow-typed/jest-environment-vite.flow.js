// Adapted from https://github.com/flow-typed/flow-typed/blob/master/definitions/npm/selenium-webdriver_v3.x.x/flow_v0.28.x-/selenium-webdriver_v3.x.x.js
type Size = {
    width: number,
    height: number,
}

type Location = {
    x: number,
    y: number,
}

type WebElement = {
    getTagName: () => Promise<string>,
    getText: () => Promise<string>,
    getSize: () => Promise<Size>,
    getLocation: () => Promise<Location>,
}

declare function render(a: React$ElementType | React$Element<any>): Promise<WebElement>;

declare class TargetLocator {
    activeElement(): Promise<WebElement>;
}

declare class By {
    using: string;
    value: string;
    constructor(using: string, value: string): this;
    static className(name: string): this;
    static css(selector: string): this;
    static id(id: string): this;
    static linkText(text: string): this;
    static js(script: string, var_args: any): this;
    static name(name: string): this;
    static partialLinkText(text: string): this;
    static tagName(name: string): this;
    static xpath(xpath: string): this;
}

declare class ActionSequence {
    constructor(driver: WebDriver): this;
    perform(): Promise<void>;
    mouseMove(
        location: WebElement,
        opt_offset?: Location
    ): ActionSequence;
    mouseMove(location: Location): ActionSequence;
    mouseDown(
        opt_elementOrButton?: WebElement,
        opt_button?: number
    ): ActionSequence;
    mouseDown(opt_elementOrButton?: number): ActionSequence;
    mouseUp(
        opt_elementOrButton?: WebElement,
        opt_button?: number
    ): ActionSequence;
    mouseUp(opt_elementOrButton?: number): ActionSequence;
    dragAndDrop(
        element: WebElement,
        location: WebElement
    ): ActionSequence;
    dragAndDrop(
        element: WebElement,
        location: Location
    ): ActionSequence;
    click(
        opt_elementOrButton?: WebElement,
        opt_button?: number
    ): ActionSequence;
    click(opt_elementOrButton?: number): ActionSequence;
    doubleClick(
        opt_elementOrButton?: WebElement,
        opt_button?: number
    ): ActionSequence;
    doubleClick(opt_elementOrButton?: number): ActionSequence;
    keyDown(key: string): ActionSequence;
    keyUp(key: string): ActionSequence;
    sendKeys(...var_args: any[]): ActionSequence;
}

declare class WebDriver {
    // constructor(
    //   session: webdriver$Session | webdriver$Promise<webdriver$Session>,
    //   executor: webdriver$CommandExecutor,
    //   opt_flow?: webdriver$ControlFlow
    // ): webdriver$WebDriver;
    // static Navigation: Class<webdriver$Navigation>;
    // static Options: Class<webdriver$Options>;
    // static Timeouts: Class<webdriver$Timeouts>;
    // static Window: Class<webdriver$Window>;
    // static Logs: Class<webdriver$Logs>;
    static TargetLocator: TargetLocator;
    // static attachToSession(
    //   executor: webdriver$CommandExecutor,
    //   sessionId: string,
    //   opt_flow?: webdriver$ControlFlow
    // ): webdriver$WebDriver;
    // static createSession(
    //   executor: webdriver$CommandExecutor,
    //   desiredCapabilities: webdriver$Capabilities,
    //   opt_flow?: webdriver$ControlFlow
    // ): webdriver$WebDriver;
    // controlFlow(): webdriver$ControlFlow;
    // schedule<T>(
    //   command: webdriver$Command,
    //   description: string
    // ): webdriver$Promise<T>;
    // setFileDetector(detector: webdriver$FileDetector): void;
    // getSession(): webdriver$Promise<webdriver$Session>;
    // getCapabilities(): webdriver$Promise<webdriver$Capabilities>;
    quit(): Promise<void>;
    actions(): ActionSequence;
    // touchActions(): webdriver$TouchSequence;
    executeScript<T>(script: string, ...var_args: any[]): Promise<T>;
    executeScript<T>(script: Function, ...var_args: any[]): Promise<T>;
    executeAsyncScript<T>(
      script: string | Function,
      ...var_args: any[]
    ): Promise<T>;
    // call<T>(
    //   fn: (...var_args: any[]) => T | webdriver$Promise<T>,
    //   opt_scope?: any,
    //   ...var_args: any[]
    // ): webdriver$Promise<T>;
    // wait(
    //     condition: webdriver$Promise<any> | webdriver$Condition | Function,
    //     timeout: ?number,
    //     message: ?string
    // ): webdriver$Promise<any>;
    sleep(ms: number): Promise<void>;
    getWindowHandle(): Promise<string>;
    getAllWindowHandles(): Promise<Array<string>>;
    getPageSource(): Promise<string>;
    close(): Promise<void>;
    get(url: string): Promise<void>;
    getCurrentUrl(): Promise<string>;
    getTitle(): Promise<string>;
    findElement(locator: By | Function): Promise<WebElement>;
    isElementPresent(locator: By | Function): Promise<boolean>;
    findElements(locator: By | Function): Promise<Array<WebElement>>;
    // takeScreenshot(): webdriver$Promise<string>;
    // manage(): webdriver$Options;
    // navigate(): webdriver$Navigation;
    switchTo(): TargetLocator;
}

declare var driver: WebDriver;
