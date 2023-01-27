import clsx from "clsx";
import React from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { EMessageType, IStoryData } from "../../interfaces/Story.interface";
import s from "./Card.module.scss";

export type IStoryCard = Omit<IStoryData, "id"> & {
  title: string;
  className?: string;
};

export function StoryCard({
  title,
  replies,
  buttons,
  nextScene,
  className,
  ...props
}: IStoryCard): JSX.Element {
  return (
    <Card className={clsx(s.StoryCard, className)} {...props}>
      <Card.Header className={s.StoryCard__Header}>
        <div>{title}</div>
        <Button variant={"outline-dark"} style={{ border: "none" }}>
          <span className="bi bi-pencil-square" />
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <h6>Replies</h6>
          <ListGroup>
            {replies.map((reply, key): JSX.Element => {
              switch (reply.type) {
                case EMessageType.text:
                  return (
                    <ListGroup.Item key={key}>{reply.content}</ListGroup.Item>
                  );
                case EMessageType.image:
                  return <Card.Img src={reply.content} key={key} />;
              }
              return <ListGroup.Item key={key}>{reply.content}</ListGroup.Item>;
            })}
          </ListGroup>
        </Row>
        {buttons && (
          <Row>
            <h6>Buttons</h6>
            <ListGroup>
              {buttons.map((button, key) => {
                return (
                  <ListGroup.Item key={key}>
                    <div>
                      <strong>{button.nextScene.scene}</strong>
                    </div>
                    <div>{button.content}</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Row>
        )}
        {nextScene && (
          <Row>
            <h6>Auto change scene</h6>
            <div>{nextScene.scene}</div>
            {nextScene.sideEffect && (
              <div>delay: {nextScene.sideEffect?.delay}</div>
            )}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
