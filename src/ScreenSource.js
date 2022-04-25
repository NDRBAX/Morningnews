import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    const APIResultsLoading = async () => {
      const data = await fetch(
        "https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=fbfe9d79aca14757a81700bfe6fe1c31"
      );
      const body = await data.json();
      setSourceList(body.sources);
    };

    APIResultsLoading();
  }, []);

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(source) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${source.id}`}>
                    {source.name}
                  </Link>
                }
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
