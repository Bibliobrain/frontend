import request from "./Request";

const LoanService = {
  loan: (copyId, memberId) => {
    return request({
      url: `/loans`,
      method: "POST",
      data: {
        copyId,
        memberId,
      },
    });
  },

  return: (copyId, memberId, condition, borrowDate) => {
    return request({
      url: `/loans`,
      method: "PATCH",
      data: {
        copyId,
        memberId,
        condition,
        borrowDate,
      },
    });
  },
};

export default LoanService;
