// The QED Room — Tailwind preset (only needed if the site uses Tailwind).
// tailwind.config.js:  module.exports = { presets: [require('./qed-design/tailwind.preset.js')], content: [...] }
const ramp = (n900, n700, n500, n400, n300, n100, n50) => ({
  900: n900, 700: n700, 500: n500, 400: n400, 300: n300, 100: n100, 50: n50,
});

module.exports = {
  theme: {
    extend: {
      colors: {
        qed: { green: '#3B5D39', yellow: '#E8C544', charcoal: '#333333' },
        neutral: { ...ramp('#141414', '#2F2F2F', '#575757', '#8B8B8B', '#BEBEBE', '#DCDCDC', '#EFEFEF'), paper: '#F5F5F5' },
        red: ramp('#691119', '#A12028', '#C84152', '#E76F82', '#EFA1AF', '#F5D5DB', '#F5D5DB'),
        orange: ramp('#603713', '#8A4E1E', '#CB7732', '#ED8736', '#F1B275', '#F9DEC2', '#F9DEC2'),
        yellow: ramp('#604C15', '#957725', '#D4A738', '#F7CE55', '#FAE397', '#FDF1C9', '#FDF1C9'),
        green: ramp('#183F34', '#2A6050', '#3D8771', '#54B698', '#67DDB9', '#CBF3EB', '#CBF3EB'),
        blue: ramp('#143657', '#205080', '#3C87D8', '#69B7F9', '#98CFFB', '#D3EBFD', '#D3EBFD'),
        purple: ramp('#230374', '#401AA5', '#6747BB', '#8D72F7', '#AB97F8', '#D8D1F5', '#D8D1F5'),
      },
      fontFamily: {
        display: ['Amaranth', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
        input: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['56px', '60px'],
        h1: ['40px', '46px'],
        h2: ['28px', '34px'],
        h3: ['20px', '28px'],
        body: ['17px', '28px'],
        small: ['14px', '22px'],
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px', pill: '999px' },
      boxShadow: { card: '0 2px 8px rgba(59, 93, 57, 0.12)' },
      maxWidth: { content: '1160px' },
      minHeight: { target: '44px' },
    },
  },
};
