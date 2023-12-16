import { forwardRef } from "react";
import PropTypes from "prop-types";
// next
import Head from "next/head";
// @mui
import { Box, styled } from "@mui/system";

const StyledBox = styled(Box)({
  // Add other common styles as needed
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  // bgcolor: "background.default",
  // color: "text.primary",
  // p: 3,
  // gap: 15,
});

// const Page = forwardRef(({ Component, ...other }, ref) => (
//   <>
//     <StyledBox ref={ref} {...other}>
//       <Component />
//     </StyledBox>
//   </>
// ));
//
// export default Page;

const Page = (Component) => {
  const WithPageStyles = (props, ref) => (
    <StyledBox ref={ref} {...props}>
      <Component {...props} />
    </StyledBox>
  );

  return forwardRef(WithPageStyles);
};

export default Page;