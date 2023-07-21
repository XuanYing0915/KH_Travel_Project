import React, { useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'

function MyTabs() {
  const [activeTab, setActiveTab] = useState('itinerary') // Default active tab is 'itinerary'

  return (
    <div>
      <Nav
        variant="tabs"
        defaultActiveKey="itinerary"
        onSelect={(tab) => setActiveTab(tab)}
        style={{ height: '100px', marginTop: '50px' }}
      >
        <Nav.Item>
          <Nav.Link eventKey="itinerary">Itinerary</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="search">Search</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="collect">Collect</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="itinerary">
          <p>Content for Itinerary tab goes here...</p>
        </Tab.Pane>
        <Tab.Pane eventKey="search">
          <p>Content for Search tab goes here...</p>
        </Tab.Pane>
        <Tab.Pane eventKey="collect">
          <p>Content for Collect tab goes here...</p>
        </Tab.Pane>
      </Tab.Content>
    </div>
  )
}

export default MyTabs
