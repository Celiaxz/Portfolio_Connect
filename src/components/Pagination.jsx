import { Button, Container } from "@mantine/core";
function Pagination({ currentPage, totalPages, onPrevClick, onNextClick }) {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5rem", // Adjust spacing as needed
      }}
    >
      <Button
        onClick={onPrevClick}
        disabled={currentPage === 1}
        size="md"
        variant="outline"
        color="teal"
        style={{ marginRight: "0.5rem" }}
      >
        <i className="left"></i> Previous
      </Button>
      <Button
        onClick={onNextClick}
        disabled={currentPage >= totalPages}
        size="md"
        variant="outline"
        color="teal"
      >
        Next <i className="fas fa-chevron-right"></i>
      </Button>
    </Container>
  );
}

export default Pagination;
