import React, { useState } from 'react';
import $ from 'jquery';
import { Footer } from './Footer';
import { Body } from './Body';
import { Header } from './Header';

export function Sidebar() {
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);

  const handleNewCollectionClick = () => {
    $('#sidebar-body').scrollTop($('#sidebar-body').height() as number); // scroll down to the bottom of the div.
    setShowNewCollectionInput(true); // create new text input field
  };

  return (
    <div className="flex flex-col min-h-0 border-r bg-white border-gray-200 pt-5 ">
      <Header onNewCollectionClick={handleNewCollectionClick} />
      <Body
        {...{
          setShowNewCollectionInput,
          showNewCollectionInput,
        }}
      />
      <Footer />
    </div>
  );
}
