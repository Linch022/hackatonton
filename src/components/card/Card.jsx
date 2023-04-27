import React from "react";

const Card = ({ artistEvent, selectEvent }) => {
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year} / ${hours}h${minutes}`;
  };

  return (
    <section className="card-section">
      {artistEvent && (
        <div
          key={artistEvent.id}
          className="event-card"
          onClick={() => selectEvent(artistEvent)}
        >
          <p className="event-descr">
            {artistEvent.venue.name}
            <p className="event-date">{formatDate(artistEvent.datetime)}</p>
          </p>
        </div>
      )}
    </section>
  );
};

export default Card;
