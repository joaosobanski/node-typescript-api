import pino from 'pino'

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            ignore: "pid,hostname",
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            colorize: true,
            errorLikeObjectKeys: ["err", "error"],
        },
    },
});

export default logger; 