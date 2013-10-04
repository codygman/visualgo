var actionsWidth = 150;
var statusCodetraceWidth = 410;

var isSamplesOpen = false;
var isBFSOpen = false;
var isBellmanFordsOpen = false;
var isDijkstrasOpen = false;

function openSamples() {
	if(!isSamplesOpen) {
		$('#sample1').animate({
			width: "+="+150
		}, 100, function() {
			$('#sample2').animate({
				width: "+="+150
			}, 100, function() {
				$('#sample3').animate({
					width: "+="+150
				}, 100,	function() {
					$('#sample4').animate({
						width: "+="+150
					}, 100);
				});
			});
		});
	}
	isSamplesOpen = true;
}
function closeSamples() {
	if(true) {
		$('#sample-err').html("");
		$('#sample1').animate({
			width: "-="+150
		}, 100, function() {
			$('#sample2').animate({
				width: "-="+150
			}, 100, function() {
				$('#sample3').animate({
					width: "-="+150
				}, 100, function() {
					$('#sample4').animate({
						width: "-="+150
					}, 100);
				});
			});
		});
		isSamplesOpen = false;
	}
}

function openBFS() {
	if(!isBFSOpen) {
		$('#bfs-input').animate({
			width: "+="+32
		}, 100, function() {
			$('#bfs-go').animate({
				width: "+="+34
			},100);
		});
	}
	isBFSOpen = true;
}
function closeBFS() {
	if(true) {
		$('#bfs-err').html("");
		$('#bfs-go').animate({
			width: "-="+34
		}, 100, function() {
			$('#bfs-input').animate({
				width: "-="+32
			}, 100);
		});
		isBFSOpen = false;
	}
}

function openBellmanFords() {
	if(!isBellmanFordsOpen) {
		$('#bellmanford-input').animate({
			width: "+="+32
		}, 100, function() {
			$('#bellmanford-go').animate({
				width: "+="+34
			},100);
		});
	}
	isBellmanFordsOpen = true;
}
function closeBellmanFords() {
	if(true) {
		$('#bellmanford-err').html("");
		$('#bellmanford-go').animate({
			width: "-="+34
		}, 100, function() {
			$('#bellmanford-input').animate({
				width: "-="+32
			}, 100);
		});
		isBellmanFordsOpen = false;
	}
}
function openDijkstras() {
	if(!isDijkstrasOpen) {
		$('#dijkstra-input').animate({
			width: "+="+32
		}, 100, function() {
			$('#dijkstra-go').animate({
				width: "+="+34
			},100);
		});
	}
	isDijkstrasOpen = true;
}
function closeDijkstras() {
	if(true) {
		$('#dijkstra-err').html("");
		$('#dijkstra-go').animate({
			width: "-="+34
		}, 100, function() {
			$('#dijkstra-input').animate({
				width: "-="+32
			}, 100);
		});
		isDijkstrasOpen = false;
	}
}

function hideEntireActionsPanel() {
	hideActionsPanel();
}

$( document ).ready(function() {
	$('#sample').click(function() {
		openSamples();
		closeBFS();
		closeBellmanFords();
		closeDijkstras();
		$('#sample1-err').html("");
		$('#bellmanford-err').html("");
		$('#dijkstra-err').html("");
	});
	
	$('#bfs').click(function() {
		closeSamples();
		openBFS();
		closeBellmanFords();
		closeDijkstras();
		$('#sample1-err').html("");
		$('#bfs-err').html("");
		$('#bellmanford-err').html("");
		$('#dijkstra-err').html("");
	});

	$('#bellmanford').click(function() {
		closeSamples();
		closeBFS();
		openBellmanFords();
		closeDijkstras();
		$('#sample1-err').html("");
		$('#bfs-err').html("");
		$('#bellmanford-err').html("");
		$('#dijkstra-err').html("");
	});
	
	$('#dijkstra').click(function() {
		closeSamples();
		closeBFS();
		closeBellmanFords();
		openDijkstras();
		$('#sample1-err').html("");
		$('#bfs-err').html("");
		$('#bellmanford-err').html("");
		$('#dijkstra-err').html("");
	});
		
	//tutorial mode
	$('#heap-tutorial-1 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#heap-tutorial-2 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#heap-tutorial-3 .tutorial-next').click(function() {
		showStatusPanel();
	});
	$('#heap-tutorial-4 .tutorial-next').click(function() {
		hideStatusPanel();
		showCodetracePanel();
	});
	$('#heap-tutorial-5 .tutorial-next').click(function() {
		hideCodetracePanel();
	});
});