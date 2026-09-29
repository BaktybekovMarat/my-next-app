export default function checkErrorStatus(status: number, errorAddress: string) {
  switch (status) {
    case 400:
      return ` Bad Request ${status}. Error from: ${errorAddress}`;

    case 401:
      return `Unauthorized ${status}. Error from: ${errorAddress}`;

    case 402:
      return `Payment Required ${status}. Error from: ${errorAddress}`;
    case 403:
      return `Forbidden ${status}. Error from: ${errorAddress}`;

    case 404:
      return `Not Found ${status}. Error from: ${errorAddress}`;

    case 408:
      return `Request Timeout  ${status}. Error from: ${errorAddress}`;

    case 409:
      return `Conflict ${status}. Error from: ${errorAddress}`;

    case 410:
      return `Gone ${status}. Error from: ${errorAddress}`;

    case 422:
      return `Unprocessable Content ${status}. Error from: ${errorAddress}`;

    default:
      if (status >= 500) {
        return `Server error ${status}. Error from: ${errorAddress}`;
      } else {
        return `Unknown error ${status}.Error from: ${errorAddress}`;
      }
  }
}
