import TabsContainer from "@/components/TabsContainer";
import { Box, Container, Tab, Tabs } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container  
      sx={{
        backgroundColor: "#F0F3F4",
        minHeight: "100vh"
      }}
      >
        <Box sx={{
          backgroundColor: "#F7FAFC",
          borderRadius: "10px"
        }}>
       
          <TabsContainer />
        </Box>
      </Container>
    </>
  );
}
