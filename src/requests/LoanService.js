import request from "./Request";

const LoanService = {
  loan: (copyId, memberId) => {
    return request({
      url: `/loans`,
      method: "POST",
      body: {
        copyId,
        memberId,
      },
    });
  },

  return: (copyId, memberId, condition, borrowDate) => {
    return request({
      url: `/loans/return`,
      method: "POST",
      body: {
        copyId,
        memberId,
        condition,
        borrowDate,
      },
    });
  },
};

export default LoanService;
