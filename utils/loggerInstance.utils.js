module.exports = {
    error(...args) {
        console.error(`  ERROR:`, ...args);
    },
    warn(...args) {
        console.warn(`   WARN:`, ...args);
    },
    info(...args) {
        console.log(`   INFO:`, ...args);
    },
    verbose(...args) {
        console.log(`VERBOSE:`, ...args);
    },
    debug(...args) {
        console.log(`  DEBUG:`, ...args);
    },
    silly(...args) {
        console.log(`  SILLY:`, ...args);
    },
};