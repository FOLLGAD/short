const crypto = require('crypto')

function randomString(length) {
	let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', // Letters to be used. Cannot exceed 255.
		charsLength = chars.length,
		randomBytes = crypto.randomBytes(length);

	let cursor = 0

	let result = Array.from(randomBytes).map(d => {
		cursor += d
		return chars[cursor % charsLength]
	})

	return result.join('')
}

module.exports.randomString = randomString;