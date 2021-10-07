import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/MailOutline";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import StoreIcon from "@material-ui/icons/Store";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Dayjs } from "dayjs";
import { isEmpty, trim } from "ramda";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { LeaveModal } from "../../components/LeaveModal";
import { Place } from "../../components/Place";
import { locationType, useBookmarkLocation } from "../../hooks/useBookmark";
import { useI18n } from "../../hooks/useI18n";
import { useTime } from "../../hooks/useTime";
import {
  travelRecordInputType,
  useTravelRecord,
} from "../../hooks/useTravelRecord";
import { dayjs } from "../../utils/dayjs";
import { getVenueName } from "../../utils/qr";

export const Home = () => {
  const { t } = useTranslation("main_screen");
  const [place, setPlace] = useState("");
  const [license, setLicense] = useState("");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveId, setLeaveId] = useState<null | string>(null);
  const { currentTravelRecord, updateTravelRecord } = useTravelRecord();
  const { enterLocation } = useTravelRecord();
  const { currentTime } = useTime();
  const { language } = useI18n();
  const {
    createBookmarkLocation,
    getBookmarkLocationId,
    removeBookmarkLocation,
  } = useBookmarkLocation();

  const today = useMemo(() => {
    return currentTime.format("YYYY-MM-DD, dddd");
  }, [currentTime]);

  const today1 = useMemo(() => {
    return currentTime.format("YYYY-MM-DD");
  }, [currentTime]);

  const handlePlaceSubmit = () => {
    enterLocation({
      nameZh: place,
      type: locationType.PLACE,
      inputType: travelRecordInputType.MANUALLY,
    });
  };

  const handleTaxiSubmit = () => {
    enterLocation({
      venueId: license,
      type: locationType.TAXI,
      inputType: travelRecordInputType.MANUALLY,
    });
  };

  const handleLeave = (date: Dayjs) => {
    if (!leaveId) return;
    updateTravelRecord(leaveId, {
      outTime: date.startOf("minute").toISOString(),
    });
    setLeaveModalOpen(false);
  };

  useEffect(() => {
    if (leaveId) setLeaveModalOpen(true);
  }, [leaveId]);

  useEffect(() => {
    if (!leaveModalOpen) setLeaveId(null);
  }, [leaveModalOpen]);

  return (
    <PageWrapper>
      {leaveId && (
        <LeaveModal
          id={leaveId}
          visible={leaveModalOpen}
          onDiscard={() => {
            setLeaveModalOpen(false);
          }}
          onFinish={handleLeave}
        />
      )}
      <Welcome>
        <Title>
          <div>{today}</div>
          <h1>{t("home.record_your_visit")}</h1>
        </Title>
      </Welcome>
      <SliderWrapper>
        <Slider>
          <StyledCard style={{
              borderRadius: "3.5%",
            }}>
            <Link to="/qrReader">
              <Card1>
                <CardContent style={{
                    padding: "16px 16px 12px 16px",
                  }}>
                  <Typography color="textSecondary" gutterBottom>
                    <Firstcss001>
                      {t("home.form.venue_name.label")}
                    </Firstcss001>
                  </Typography>
                  <StyledPlace
                    value={t("home.form.venue_name.placeholder")}
                    onChange={setPlace}
                    placeholder={t("home.form.venue_name.placeholder")}
                  />
                </CardContent>
              </Card1>
            </Link>
            <CardActions style={{
                  padding: "3px 0px 3px 0px",
                }}>
              <Link to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    padding: "1px 1px 1px 15px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                  }}
                variant="text"
                >
                  {t("home.button.scan_qr_code")}
                </Button>
              </Link>
              <Button
                size="small"
                disabled={isEmpty(trim(place))}
                onClick={handlePlaceSubmit}
                style={{
                    color: "#ffffff",
                }}
              >
                {t("home.button.go")}
              </Button>
              <Link style={{
                    padding: "0px 0px 0px 38px",
                  }} to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    fontSize: "18px",
                    color: "#12B188",
                  }}
                variant="text"
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Link>
            </CardActions>
          </StyledCard>

          {/*-------------------------------------------*/}

          <StyledCard style={{
              borderRadius: "3.5%",
            }}>
            <Card2>
              <CardContent style={{
                  padding: "16px 16px 12px 16px",
                }}>
                <Typography color="textSecondary" gutterBottom>
                  <Firstcss001>
                    {t("home.form.taxi.label")}
                  </Firstcss001>
                </Typography>
                <StyledPlace
                  value={t("home.form.taxi.placeholder")}
                  onChange={setLicense}
                  placeholder={t("home.form.taxi.placeholder")}
                />
              </CardContent>
            </Card2>
            <CardActions style={{
                  padding: "3px 0px 3px 0px",
                }}>
              <Link to="/qrReader">
                <Button 
                    disabled={isEmpty(trim(license))}
                    onClick={handleTaxiSubmit}
                    color="primary" 
                    style={{
                    backgroundColor: "white",
                    padding: "1px 1px 1px 15px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    color: "#009688",
                  }}
                variant="text"
                >
                  {t("home.button.ride")}
                </Button>
              </Link>
              <Button
                size="small"
                disabled={isEmpty(trim(place))}
                onClick={handlePlaceSubmit}
                style={{
                    color: "#ffffff",
                }}
              >
                {t("home.button.go")}
              </Button>
              <Link style={{
                    padding: "0px 0px 0px 38px",
                  }} to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    fontSize: "18px",
                    color: "#12B188",
                  }}
                variant="text"
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Link>
            </CardActions>
          </StyledCard>




          {/*-------------------------------------------*/}

          <StyledCard style={{
              borderRadius: "3.5%",
            }}>
            <Card3>
              <CardContent style={{
                  padding: "16px 16px 12px 16px",
                }}>
                <Typography color="textSecondary" gutterBottom>
                  <Firstcss003>
                    {t("home.form.report.label")}
                  </Firstcss003>
                </Typography>
                <StyledPlace
                  value={t("home.form.report.placeholder")}
                  onChange={setPlace}
                  placeholder={t("home.form.report.placeholder")}
                />
              </CardContent>
            </Card3>
            <CardActions style={{
                  padding: "3px 0px 3px 0px",
                }}>
              <Link to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    padding: "1px 1px 1px 15px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                  }}
                variant="text"
                >
                  {t("home.button.report")}
                </Button>
              </Link>
              <Button
                size="small"
                disabled={isEmpty(trim(place))}
                onClick={handlePlaceSubmit}
                style={{
                    color: "#ffffff",
                }}
              >
                {t("home.button.report")}
              </Button>
              <Link style={{
                    padding: "0px 0px 0px 38px",
                  }} to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    fontSize: "18px",
                    color: "#12B188",
                  }}
                variant="text"
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Link>
            </CardActions>
          </StyledCard>




         <StyledCard style={{
              borderRadius: "3.5%",
            }}>
            <Card5>
              <CardContent style={{
                  padding: "16px 16px 12px 16px",
                }}>
                <Typography color="textSecondary" gutterBottom>
                  <Firstcss003>
                    {t("home.form.vaccine.label")}
                  </Firstcss003>
                </Typography>
                <StyledPlace
                  value={t("home.form.vaccine.placeholder")}
                  onChange={setPlace}
                  placeholder={t("home.form.vaccine.placeholder")}
                />
              </CardContent>
            </Card5>
            <CardActions style={{
                  padding: "3px 0px 3px 0px",
                }}>
              <Link to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    padding: "1px 1px 1px 15px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                  }}
                variant="text"
                >
                  {t("home.button.scan_qr_code")}
                </Button>
              </Link>
              <Button
                size="small"
                disabled={isEmpty(trim(place))}
                onClick={handlePlaceSubmit}
                style={{
                    color: "#ffffff",
                }}
              >
                {t("home.button.scan_qr_code")}
              </Button>
              <Link style={{
                    padding: "0px 0px 0px 38px",
                  }} to="/qrReader">
                <Button color="primary" style={{
                    backgroundColor: "white",
                    fontSize: "18px",
                    color: "#12B188",
                  }}
                variant="text"
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Link>
            </CardActions>
          </StyledCard>
        </Slider>
      </SliderWrapper>

      {/*----------------------------------------------------------------------------*/}

          <Stack style={{
            backgroundColor: "white",
            padding: "0 0 0 25px",
            minHeight: "150px",
            overflow: "scroll",
          }}
          spacing={1}
          direction="row">
            <CardContent
              style={{
                backgroundColor: "#B5E2D9",
                borderRadius: "5%",
                width: "200px",
                height: "147px",
                padding: "0 0 0 0",
                minWidth: "200px",
              }}
            >
              <Text001>
                <Button
                  style={{
                    padding: "1px 1px 1px 1px",
                    color: "black",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    fontWeight: "normal",
                  }}
                  variant="text"
                >
                  最後更新<div>{today1}</div>
                </Button>
              </Text001>
              <Text002>
                <Button
                  style={{
                    color: "black",
                    whiteSpace: "nowrap",
                    fontSize: "18px",
                    padding: "5px 0px 0px 45px",
                    fontWeight: "normal"
                  }}
                >
                  感染風險通知
                </Button>
              </Text002>
              <Text003>
                <Button
                  style={{
                    color: "black",
                    whiteSpace: "nowrap",
                    fontSize: "28px",
                    padding: "0px 0px 0px 80px",
                    left: "-5px",
                    top: "-10px"
                  }}
                >
                  0次
                </Button>
              </Text003>
              <Text005>
                <Button
                  style={{
                    backgroundColor: "#12B188",
                    color: "white",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    padding: "5px 47px 5px 47px",
                    left: "13px",
                    top: "-10px",
                    fontWeight: "normal"
                  }}
                >
                  更多詳細訊息
                </Button>
              </Text005>
            </CardContent>
            <CardContent
                style={{
                  backgroundColor: "#12B188",
                  borderRadius: "3.5%",
                  width: "200px",
                  height: "147px",
                  padding: "0 0 0 0",
                  minWidth: "200px",
                }}
              >
                <Image001>
                  <ImageList 
                    sx={{ width: 65, height: 65 }} 
                    cols={1} 
                    rowHeight={65}
                    style={{
                      padding: "20px 0px 0px 70px",
                    }}
                  >
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}`}
                          srcSet={`${item.img}`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Image001>
                <TextB002  style={{
                  padding: "15px 0px 0px 65px",
                  fontSize: "15px",
                }}>
                電子針卡
                </TextB002>
              </CardContent>

              <CardContent>
              </CardContent>


          </Stack>








          {/*-----------------------------------------------------------------------------*/}



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
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.div`
  color: #fff;
  padding: 60px 24px 32px 24px;
  flex-shrink: 0;
`;

const Title = styled.div`
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  line-height: 25px;
`;

const Firstcss001 = styled.div`
    display: grid;
    grid: 200px / auto auto auto;
    align-items: end;
    font-size: 28px;
    color: white;
    font-weight: bold;
    line-height: 1;
`;

const Firstcss003 = styled.div`
    display: grid;
    grid: 200px / auto auto auto;
    align-items: end;
    font-size: 20px;
    color: white;
    font-weight: bold;
    line-height: 1;
`;

// const ButtonTextStyle1 = styled.div`
//     font-size: 18px;
// `;

const Card1 = styled.div`
    background-image: url("https://raw.githubusercontent.com/Error4046716/Error5081/main/src/assets/cus/cover1.jpg");
    background-size: 100% 100%;
`;

const Card2 = styled.div`
    background-image: url("https://raw.githubusercontent.com/Error4046716/Error5081/main/src/assets/cus/cover2.jpg");
    background-size: 100% 100%;
`;

const Card3 = styled.div`
    background-image: url("https://raw.githubusercontent.com/Error4046716/Error5081/main/src/assets/cus/cover3.jpg");
    background-size: 100% 100%;
`;

const Card5 = styled.div`
    background-image: url("https://raw.githubusercontent.com/Error4046716/Error5081/main/src/assets/cus/cover5.png");
    background-size: 100% 100%;
`;

const StyledCard = styled(Card)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
  min-width: 68vw;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
  width: 100%;
  left: 0;
  top: -30px;
  padding: 8px 0;

  &::before {
    content: "";
    flex: 0 0 24px;
  }

  &::after {
    content: "";
    flex: 0 0 24px;
  }

  & ${StyledCard}:not(:last-child) {
    margin-right: 13px;
  }
`;

const StyledPlace = styled(Place)`
  text-align: left;
  font-size: 15px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0);
  color: white;
  padding-bottom: 0px;
  line-height: 15px;
`;

//最後面中間白色
const SliderWrapper = styled.div`
  background-color: #fff;
  border-radius: 32px 32px 0 0;
  flex-shrink: 0;
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

const Item = styled(Card)`
  margin-bottom: 16px;
`;

const Msg = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
  line-height: 48px;
`;

const Text001 = styled.div`
  /* align-items: flex-start; */
  padding: 10px 0px 0px 10px;
  overflow: hidden;
  height: 20px;
`;

const Text002 = styled.div`
  align-items: center;
  overflow: hidden;
  /* line-height: 0; */
  padding: 0px 0px 0px 0px;
`;

const Text003 = styled.div`
  align-items: center;
  /* overflow: hidden; */
  padding: 0px 0px 0px 0px;
`;

const Text005 = styled.div`
  align-items: center;
  /* overflow: hidden; */
  padding: 0px 0px 0px 0px;
`;

const Image001 = styled.div`
  align-items: center;
`;

const TextB002 = styled.div`
  align-items: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
`;

const itemData = [
  {
    img:
      "https://raw.githubusercontent.com/Error4046716/Error5081/main/src/assets/app_assets_icon_vaccine.png",
    title: "000",
    author: "Vaccine"
  }
];

