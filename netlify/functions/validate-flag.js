exports.handler = async function (event) {
  const correctFlags = {
    "BlackPinkScanner": "Stay{how_you_like_that_meta}",
    "SKZMessage^": "Stay{step_out_and_decode}",
  };

  const { title, flag } = JSON.parse(event.body);

  if (correctFlags[title] && correctFlags[title] === flag) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Correct flag!" })
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, message: "Wrong flag, try again!" })
    };
  }
};
