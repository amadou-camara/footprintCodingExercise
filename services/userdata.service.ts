import { IUserData } from "./../interfaces/UserDataType";

export class UserDataService {
  public async getUsers(search?: string): Promise<IUserData[]> {
    let query: string =
      "https://footprint-cc.preview.onefootprint.com/api/users";

    if (search) {
      query += `?search=${search}`;
    }

    const response = await fetch(query);
    const jsonResponse: IUserData[] = await response.json();

    const cleanedArray = jsonResponse.map((userData) => {
      let cleanedData = { ...userData };
      cleanedData.ssn = userData.ssn.replace(/[^0-9a-z]/gi, "");
      let cleanedNumber = this.formatPhoneNumber(userData.phone);
      if (cleanedNumber) {
        cleanedData.phone = cleanedNumber.slice(3);
      }
      let dateObject = new Date(userData.createdAt);
      cleanedData.createdAt = this.formatDate(dateObject);

      return cleanedData;
    });

    return cleanedArray;
  }

  private formatPhoneNumber(numberString: string): string | null {
    var cleaned = ("" + numberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  private formatDate(date: Date) {
    return (
      [
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join("/") +
      ", " +
      [
        this.padTo2Digits(date.getHours() % 12),
        this.padTo2Digits(date.getMinutes()),
      ].join(":") +
      (date.getHours() < 12 ? "am" : "pm")
    );
  }
}
