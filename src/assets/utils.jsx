import { jwtDecode } from "jwt-decode";

// const jwtDecode = (token, config) => {
//   if (config && config.header) {
//     return { exp: 1710877906798 };
//   } else {
//     return { id: 1, name: "admin", roles: ["ROLE_ADMIN"] };
//   }
// };

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const decodeToken = (token) => {
  // Decode a Json Web Token
  try {
    return {
      header: jwtDecode(token, { header: true }),
      payload: jwtDecode(token),
    };
  } catch (e) {
    return null;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format the date as a human-readable string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "KSH",
  });
};

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

export function snakeCaseToTitleCase(inputString) {
  return inputString
    .split("_")
    .map((c, i) => capitalize(c))
    .join(" ");
}

export function joinArrays(string, delimiter, highLightClassName) {
  const result = [];

  const spanner = (str, idx) => <span key={idx}>{str}</span>;

  const highlight = (str, idx) => (
    <b key={idx} className={`${highLightClassName}`}>
      {str}
    </b>
  );

  if (!delimiter || !string) {
    return [string];
  }

  let match = string.match(new RegExp(delimiter, "i"));

  if (match) {
    if (!string.match(new RegExp(delimiter, "i"))[0]) {
      return [string];
    }
  } else {
    return [string];
  }

  let prev = 0;
  let index = 0;

  if (string.slice(prev, match.index)) {
    index += 1;
    result.push(spanner(string.slice(prev, match.index), index));
  }

  do {
    if (match) {
      index += 1;
      result.push(highlight(match[0], index));
    }

    prev += match.index + match[0].length;

    match = string.slice(prev).match(new RegExp(delimiter, "i"));

    if (match) {
      index += 1;
      result.push(spanner(string.slice(prev, prev + match.index), index));
    }
  } while (match);

  if (string.slice(prev)) {
    index += 1;
    result.push(spanner(string.slice(prev), index));
  }

  return result;
}
