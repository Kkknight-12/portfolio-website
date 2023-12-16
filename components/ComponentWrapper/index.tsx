import { forwardRef } from "react";
import PropTypes from "prop-types";
// next
import Head from "next/head";
// @mui
import { Box, styled } from "@mui/system";
import { ComponentType, PropsWithChildren, Ref, ReactNode } from "react";

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

type ComponentProps = {
  children?: ReactNode;
};

const Page = (Component: ComponentType<ComponentProps>) => {
  const WithPageStyles = (
    props: PropsWithChildren<ComponentProps>,
    ref: Ref<any>
  ) => (
    <StyledBox ref={ref} {...props}>
      <Component {...props} />
    </StyledBox>
  );

  return forwardRef(WithPageStyles);
};

export default Page;