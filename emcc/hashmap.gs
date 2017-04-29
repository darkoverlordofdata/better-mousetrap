
[Compact]
class HashMap of K, V

	keys: List of K = new List of K
	data: List of V = new List of V

	def hasKey(key:K):bool
		for var k in keys do if k == key do return true
		return false
		

	def add(key:K, value:V)
		for var k in keys do if k == key do return
		keys.append(key)
		data.append(value)

		