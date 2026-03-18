const { aplus_queue } = window;
const umengclick = (name) => {
    aplus_queue.push({
        action: 'aplus.record',
        arguments: [name, 'CLK']
    })
}

export {
    umengclick
}