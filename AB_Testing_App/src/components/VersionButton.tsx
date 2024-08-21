import React from 'react';

type ABTestVersion = 'A' | 'B' | null;

interface VersionButtonProps {
  version: ABTestVersion;
  selectedVersion: ABTestVersion;
  onClick: (version: ABTestVersion) => void;
}

const VersionButton: React.FC<VersionButtonProps> = ({ version, selectedVersion, onClick }) => {
  const isSelected = selectedVersion === version;
  const handleClick = () => onClick(version);

  return (
    <button
      onClick={handleClick}
      disabled={isSelected}
    >
      {isSelected ? `Version ${version} Selected` : `Set Version ${version}`}
    </button>
  );
};

export default VersionButton;
