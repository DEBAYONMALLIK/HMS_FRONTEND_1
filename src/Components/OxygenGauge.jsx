
import LiquidFillGauge from 'react-liquid-gauge';

const OxygenGauge = ({ value }) => {
  return (
    <div style={{ width: 250, height: 250 }}>
      <LiquidFillGauge
        value={value}
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        circleStyle={{
          fill: '#0EAD69', // greenish
        }}
        waveStyle={{
          fill: '#0EAD69',
        }}
        textStyle={{
          fill: '#444',
          fontSize: '1em',
        }}
        waveTextStyle={{
          fill: '#fff',
          fontSize: '1em',
        }}
      />
    </div>
  );
};

export default OxygenGauge;
