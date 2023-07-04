const redirectTo = (path) => {
    return new Response(`Redirectin to ${path}.`, {
        status: 303,
        headers: {
            "Location":path,
        },
    });
};

const setResponseDetails = () => {
    const responseDetails = {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
    }
    return responseDetails;
  };

export { redirectTo, setResponseDetails };