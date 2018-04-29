/*
 * Example - Running code on an ethereum-vm
 *
 *
 * To run this example in the browser, use the pre-bundled
 * version (bundle.js) or bundle it with browserify
 * `browserify index.js -o bundle.js` and then load
 * this folder onto a HTTP WebServer (such as node-static)
 */
var Buffer = require('safe-buffer').Buffer // use for Node.js <4.5.0
var VM = require('../../index.js')

// create a new VM instance
var vm = new VM()

var code = '7f4e616d65526567000000000000000000000000000000000000000000000000003055307f4e616d6552656700000000000000000000000000000000000000000000000000557f436f6e666967000000000000000000000000000000000000000000000000000073661005d2720d855f1d9976f88bb10c1a3398c77f5573661005d2720d855f1d9976f88bb10c1a3398c77f7f436f6e6669670000000000000000000000000000000000000000000000000000553360455560df806100c56000396000f3007f726567697374657200000000000000000000000000000000000000000000000060003514156053576020355415603257005b335415603e5760003354555b6020353360006000a233602035556020353355005b60007f756e72656769737465720000000000000000000000000000000000000000000060003514156082575033545b1560995733335460006000a2600033545560003355005b60007f6b696c6c00000000000000000000000000000000000000000000000000000000600035141560cb575060455433145b1560d25733ff5b6000355460005260206000f3'

vm.on('step', function (data) {
  console.log(data.opcode.name)
})

vm.runCode({
  code: Buffer.from(code, 'hex'),
  gasLimit: Buffer.from('ffffffff', 'hex')
}, function (err, results) {
  console.log('returned: ' + results.return.toString('hex'))
  console.log('gasUsed: ' + results.gasUsed.toString())
  console.log(err)
})