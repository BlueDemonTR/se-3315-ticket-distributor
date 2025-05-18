// ESCAPES ALL SPECIAL CHARACTERS IN PASSED STRING SO THAT THEY WORK PROPERLY IN REGEXES

function escapeString(string) {
	return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')
}

export default escapeString