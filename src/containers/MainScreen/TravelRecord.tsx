import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import BookmarkIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/MailOutline";
// import DeleteIcon from "@material-ui/icons/Delete";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import StoreIcon from "@material-ui/icons/Store";
import dayjs from "dayjs";
import { isEmpty } from "ramda";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import incognitoIcon from "../../assets/incognito.svg";
import { Header } from "../../components/Header";
import { useBookmarkLocation } from "../../hooks/useBookmark";
import { useI18n } from "../../hooks/useI18n";
import { useTravelRecord } from "../../hooks/useTravelRecord";
import { getVenueName } from "../../utils/qr";

export const TravelRecord = () => {
  const { t } = useTranslation("main_screen");
  const {
    pastTravelRecord,
    removeTravelRecord,
    incognito,
    autoRemoveRecordDay,
    currentTravelRecord,
  } = useTravelRecord();
  const { language } = useI18n();
  const {
    createBookmarkLocation,
    getBookmarkLocationId,
    removeBookmarkLocation,
  } = useBookmarkLocation();

  return (
    <PageWrapper>
      <Header name={t("travel_record.name")} />




      <TravelRecordWrapper style={{
            minHeight: "200px",
            padding: "150px 0px 0px 0px",
          }}>
        <TravelRecordInner>
          <h3>{t("home.you_have_entered")}</h3>
          {isEmpty(currentTravelRecord) && (
            <Msg>{t("travel_record.message.empty")}</Msg>
          )}
          {currentTravelRecord.map((item) => {
            const bookmarkId = getBookmarkLocationId(item);
            return (
              <Item key={item.id}>
                <CardHeader
                  avatar={
                    item.type === locationType.TAXI ? (
                      <LocalTaxiIcon />
                    ) : (
                      <StoreIcon />
                    )
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        bookmarkId
                          ? removeBookmarkLocation(bookmarkId)
                          : createBookmarkLocation(item);
                      }}
                    >
                      {bookmarkId ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  }
                  title={getVenueName(item, language)}
                  subheader={`${dayjs(item.inTime).format(
                    "YYYY-MM-DD HH:mm"
                  )} - ${
                    item.outTime
                      ? dayjs(item.outTime).format("YYYY-MM-DD HH:mm")
                      : ""
                  }`}
                />

                <CardActions disableSpacing>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      setLeaveId(item.id);
                    }}
                  >
                    {t("global:button.leave")}
                  </Button>
                  <Link to={`/confirm/${item.id}`}>
                    <Button size="small" color="primary">
                      {t("global:button.confirm_page")}
                    </Button>
                  </Link>
                </CardActions>
              </Item>
            );
          })}
        </TravelRecordInner>
      </TravelRecordWrapper>











      <ContentWrapper>
        <List component="nav">
          {incognito && (
            <Msg>
              <IncognitoIcon src={incognitoIcon} />
              {t("travel_record.message.incognito_activated")}
            </Msg>
          )}
          {isEmpty(pastTravelRecord) && (
            <Msg>{t("travel_record.message.empty")}</Msg>
          )}
          {pastTravelRecord.map((item) => {
            const name = getVenueName(item, language);
            const bookmarkId = getBookmarkLocationId(item);
            return (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemIcon style={{
                    minWidth: "0px",
                  }}>

                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={`${dayjs(item.inTime).format(
                      "YYYY-MM-DD HH:mm"
                    )} - ${
                      item.outTime
                        ? dayjs(item.outTime).format("YYYY-MM-DD HH:mm")
                        : ""
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        bookmarkId
                          ? removeBookmarkLocation(bookmarkId)
                          : createBookmarkLocation(item);
                      }}
                    >

                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeTravelRecord(item.id);
                      }}
                      disabled={incognito}
                    >

                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </ContentWrapper>
      <AutoRemoveMessageLine>
        <div>........</div>
      </AutoRemoveMessageLine>
      <AutoRemoveMessage>
        {t("travel_record.message.auto_remove_record", {
          day: autoRemoveRecordDay,
        })}
      </AutoRemoveMessage>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Msg = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
  top: 150px;
`;

const IncognitoIcon = styled.img`
  display: block;
  width: 24px;
  margin: 8px auto 0 auto;
`;

const AutoRemoveMessageLine = styled.div`
  background-color: #d9d9d9;
  text-align: center;
  line-height: 1px;
  color: rgba(0, 0, 0, 0);
`;

const AutoRemoveMessage = styled.div`
  height: 75px;
  background-color: #ffffff;
  text-align: center;
  line-height: 70px;
  color: rgba(0, 0, 0, 0.93);
  font-size:x-small;
  font-weight: bold;
`;



const TravelRecordWrapper = styled.div`
  background-color: #fff;

  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TravelRecordInner = styled.div`
  padding: 0 16px;
`;