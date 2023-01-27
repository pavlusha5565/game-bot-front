import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { StoryCard } from "../../common/components/Card/StoryCard";
import { useStoryStore } from "../../stores/StoryStore";

function StoryPage() {
  const [story, storyStore] = useStoryStore();

  useEffect(() => {
    storyStore.requestAllStory();
  }, [storyStore]);

  return (
    <Container>
      {story?.map((card, key) => (
        <Col md={6} sm={12}>
          <StoryCard key={key} {...card} title={card.id} />
        </Col>
      ))}
    </Container>
  );
}

export default observer(StoryPage);
