export function formatRunTime(time) {
    if (time == null) {
        return " "
    }
    // console.log(time)
    if (time < 1000) {
        return time + "ms"
    } else {
        return Math.round(time / 1000 * 100) / 100 + "s"
    }
}

export function formatMemory(memory) {
    // console.log(memory)
    if (!memory) {
        return " "
    }
    if (memory < 1024) {
        return memory + "KB"
    } else {
        return Math.round(memory / 1024 * 100) / 100 + "MB"
    }
}
