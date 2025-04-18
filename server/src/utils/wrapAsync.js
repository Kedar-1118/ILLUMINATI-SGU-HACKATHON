// Desc: Wrap async functions to catch errors using try-catch block
const wrapAsync = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

// Desc: Wrap async functions to catch errors using Promise.catch
export const AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
