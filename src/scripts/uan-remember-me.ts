import { EnForm, ENGrid } from "@4site/engrid-scripts";
const tippy = require("tippy.js").default;

interface UanRememberMeOptions {
  label: string;
  tooltip: string;
  anchor: string;
  placement: "beforebegin" | "afterbegin" | "beforeend" | "afterend";
  fieldNames: string[];
}

declare global {
  interface Window {
    UanRememberMe: boolean | UanRememberMeOptions;
  }
}

export class UanRememberMe {
  private _form: EnForm = EnForm.getInstance();
  private defaultOptions: UanRememberMeOptions = {
    label: "Remember Me",
    tooltip: `
				Check “Remember me” to complete forms on this device faster. 
				While your financial information won’t be stored, you should only check this box from a personal device. 
			`,
    anchor: ".en__field--emailAddress",
    placement: "afterend",
    fieldNames: [
      "supporter.firstName",
      "supporter.lastName",
      "supporter.emailAddress",
      "supporter.phoneNumber",
      "supporter.address1",
      "supporter.address2",
      "supporter.city",
      "supporter.region",
      "supporter.postcode",
      "supporter.country",
    ],
  };
  private readonly options: UanRememberMeOptions;
  private rememberMeChecked: boolean = true;
  private seed: string = "1242362031235323113911624374228108";

  constructor() {
    const pageOptions =
      typeof window.UanRememberMe === "object" ? window.UanRememberMe : {};
    this.options = {
      ...this.defaultOptions,
      ...pageOptions,
    };

    if (!this.shouldRun()) return;

    this.createRememberMeCheckbox();
    this.addEventListeners();
    this.fillFormFieldsFromStorage();
  }

  /*
   * Run if we don't have the RememberMe option set to true, have the UanRememberMe object, and crypto is supported by the browser
   */
  private shouldRun(): boolean {
    return (
      !ENGrid.getOption("RememberMe") &&
      window.hasOwnProperty("UanRememberMe") &&
      window.UanRememberMe !== false &&
      !!window.crypto &&
      !!window.crypto.subtle
    );
  }

  /*
   * Create the Remember Me checkbox and add it to the form
   * And initialize the tippy tooltip
   */
  private createRememberMeCheckbox(): void {
    const checkboxWrapperElement = `
      <div class="en__field en__field--checkbox">
        <div class="en__field__element en__field__element--checkbox">
          <div class="en__field__item">
            <input id="uan-remember-me" type="checkbox" class="en__field__input en__field__input--checkbox" name="engrid.uan-remember-me" value="Y" checked>
            <label for="uan-remember-me" class="en__field__label en__field__label--item">
              ${this.options.label}
              <span id="uan-remember-me-tooltip" style="line-height: 1; padding-left: 5px">
                <svg style="height: 14px; width: auto; z-index: 1;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 7H9V5H11V7ZM11 9H9V15H11V9ZM10 2C5.59 2 2 5.59 2 10C2 14.41 5.59 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2ZM10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0Z" fill="currentColor"/></svg>
              </span>
            </label>
          </div>
        </div>
      </div>
    `;

    document
      .querySelector(this.options.anchor)
      ?.insertAdjacentHTML(this.options.placement, checkboxWrapperElement);

    tippy("#uan-remember-me-tooltip", { content: this.options.tooltip });
  }

  /*
   * Add event listeners to the form and the Remember Me checkbox
   */
  private addEventListeners(): void {
    this._form.onValidate.subscribe(
      this.saveSupporterDetailsToStorage.bind(this)
    );

    const rememberMeCheckbox = document.querySelector(
      "#uan-remember-me"
    ) as HTMLInputElement;

    rememberMeCheckbox?.addEventListener("change", () => {
      this.rememberMeChecked = rememberMeCheckbox.checked;

      if (!this.rememberMeChecked) {
        this.deleteSupporterDetailsFromStorage();
      }
    });
  }

  /*
   * Get the supporter details from the form fields
   */
  private getSupporterDetailsFromFields(): { [key: string]: string } {
    const supporterDetails: { [key: string]: string } = {};

    this.options.fieldNames.forEach((fieldName) => {
      let field = document.querySelector(
        `[name="${fieldName}"]`
      ) as HTMLInputElement;
      // If it is a radio or checkbox, get the checked value
      if (field) {
        if (field.type === "radio" || field.type === "checkbox") {
          field = document.querySelector(
            `[name="${fieldName}"]:checked`
          ) as HTMLInputElement;
        }
        supporterDetails[fieldName] = encodeURIComponent(field.value);
      }
    });

    return supporterDetails;
  }

  /*
   * Fill the form fields with the supporter details from the local storage
   */
  private async fillFormFieldsFromStorage(): Promise<void> {
    const uanRememberMeData = window.localStorage.getItem("uan-remember-me");
    if (!uanRememberMeData) return;

    const encryptedSupporterDetails = JSON.parse(
      window.atob(uanRememberMeData)
    );

    if (!encryptedSupporterDetails) return;

    const supporterDetails: { [key: string]: string } = JSON.parse(
      await this.decryptSupporterDetails(
        this.base64ToArrayBuffer(encryptedSupporterDetails.encryptedData),
        new Uint8Array(this.base64ToArrayBuffer(encryptedSupporterDetails.iv))
      )
    );

    this.options.fieldNames.forEach((fieldName) => {
      if (!supporterDetails[fieldName]) return;
      ENGrid.setFieldValue(
        fieldName,
        decodeURIComponent(supporterDetails[fieldName])
      );
    });
  }

  /*
   * Save the supporter details to local storage
   */
  private async saveSupporterDetailsToStorage(): Promise<void> {
    if (!this.rememberMeChecked || !this._form.validate) return;

    const encryptedSupporterDetails = await this.encryptSupporterDetails(
      this.getSupporterDetailsFromFields()
    );

    window.localStorage.setItem(
      "uan-remember-me",
      window.btoa(
        JSON.stringify({
          encryptedData: encryptedSupporterDetails.encryptedData,
          iv: encryptedSupporterDetails.iv,
        })
      )
    );
  }

  /*
   * Delete the supporter details from local storage
   */
  private deleteSupporterDetailsFromStorage(): void {
    window.localStorage.removeItem("uan-remember-me");
  }

  /*
   * Encrypt the supporter details
   */
  private async encryptSupporterDetails(supporterDetails: {
    [key: string]: string;
  }): Promise<{ encryptedData: string; iv: string }> {
    const supporterDetailsString = JSON.stringify(supporterDetails);
    const encryptionKey = await this.createEncryptionKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      encryptionKey,
      new TextEncoder().encode(supporterDetailsString)
    );

    return {
      encryptedData: this.arrayBufferToBase64(encryptedData),
      iv: this.arrayBufferToBase64(iv),
    };
  }

  /*
   * Decrypt the supporter details
   */
  private async decryptSupporterDetails(
    encryptedSupporterDetails: ArrayBuffer,
    iv: ArrayBuffer
  ): Promise<string> {
    const encryptionKey = await this.createEncryptionKey();

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      encryptionKey,
      encryptedSupporterDetails
    );

    return new TextDecoder().decode(decryptedData);
  }

  /*
   * Create the encryption key
   */
  private async createEncryptionKey() {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(this.seed),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(this.seed),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  /*
   * Convert an ArrayBuffer to a base64 string
   */
  private arrayBufferToBase64(buffer: Iterable<number>): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /*
   * Create an Array Buffer from a base64 string
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
